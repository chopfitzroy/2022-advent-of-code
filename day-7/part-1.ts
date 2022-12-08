import { nanoid } from "https://deno.land/x/nanoid/mod.ts";

interface File {
  type: "file";
  name: string;
  size: number;
  parent: string;
}

interface Dir {
  id: string;
  type: "dir";
  name: string;
  parent: null | string;
}

type FileOrDir = File | Dir;

const formatOutput = (output: string[], parent: string): FileOrDir[] => {
  return output.map((line) => {
    const [left, right] = line.split(" ");
    if (left === "dir") {
      return {
        id: nanoid(),
        type: "dir",
        name: right,
        parent,
      };
    }

    return {
      name: right,
      type: "file",
      size: parseInt(left),
      parent,
    };
  });
};

const processLines = (payload: string[]) => {
  const rootNode = nanoid();
  // @NOTE hide this internally for cleaner type signature
  const processLine = (
    remaining: string[],
    processed: FileOrDir[],
    currentNode: string,
  ): Error | FileOrDir[] => {
    if (remaining.length === 0) {
      return processed;
    }

    const [head, ...tail] = remaining;
    const [id, command, instructions] = head.split(" ");

    if (id !== "$") {
      return new Error(
        `Recieved non-command string, please check input, '${head}'`,
      );
    }

    if (command === "ls") {
      const index = tail.findIndex((item) => item.charAt(0) === "$");
      const next = tail.slice(index);
      const output = tail.slice(0, index);

      // @NOTE
      // - When there are no more commands we use the last array items
      // - In other words once we are at the end of the list
      if (index === -1) {
        const formatted = formatOutput(next, currentNode);
        return processLine([], [...processed, ...formatted], currentNode);
      }

      const formatted = formatOutput(output, currentNode);
      return processLine(next, [...processed, ...formatted], currentNode);
    }

    if (command === "cd") {
      // @TODO
      // - Explicityly handle `/` and go to `rootNode`
      if (instructions === "/") {
        return processLine(tail, processed, rootNode);
      }

      if (instructions === "..") {
        const validParents = processed.filter((item): item is Dir =>
          item.type === "dir"
        );
        const currentDir = validParents.find((item) => item.id === currentNode);

        if (currentDir === undefined) {
          return new Error(
            `Attempted to 'cd' to non-existent directory using '..'`,
          );
        }

        if (currentDir.parent === null) {
          return new Error(
            `Attempted to 'cd' to '..' when already at top directory`,
          );
        }

        return processLine(tail, processed, currentDir.parent);
      }

      const validChildren = processed.filter((item) =>
        item.parent === currentNode
      );
      const targetDir = validChildren.find((item) =>
        item.name === instructions
      );

      if (targetDir === undefined) {
        return new Error(
          `Attempted to access dir '${instructions}' before listing it.`,
        );
      }

      if (targetDir.type === "file") {
        return new Error(`Attempting to 'cd' into file '${targetDir.name}'`);
      }

      return processLine(tail, processed, targetDir.id);
    }

    return new Error(`Invalid command found, '${command}'`);
  };

  // @NOTE
  // - We know `/` has to exist so we feed it in as a default
  return processLine(payload, [{
    id: rootNode,
    type: "dir",
    name: "/",
    parent: null,
  }], rootNode);
};

const input = await Deno.readTextFile("./input.txt");
const lines = input.split("\n");
const processed = processLines(lines);

(() => {
  if (processed instanceof Error) {
    console.log("Processing failed", processed);
    return;
  }

  const dirs = processed.filter((item): item is Dir => item.type === "dir");
  const files = processed.filter((item): item is File => item.type === 'file');

  const parents = dirs.map((item) => item.id);

  const parentsWithFileSize = parents.map(parent => {
    const children = files.filter(item => item.parent === parent);    
    const totalFileSize = children.reduce((sum, next) => sum + next.size, 0);
    return {
      id: parent,
      totalFileSize
    }
  });
  
  const dirsWithTotalFileSize = [];
  const dirsWithTotalDirSize = [];
  
  // @TODO
  // - `dirsWithTotalFileSize`
  // - `dirsWithTotalDirSize`

  console.log(parentsWithFileSize);
})();
