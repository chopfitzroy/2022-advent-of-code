import { nanoid } from "https://deno.land/x/nanoid/mod.ts";

const input = await Deno.readTextFile("./input.txt");

interface File {
  name: string;
  size: number;
  parent: string;
}

interface Dir {
  id: string;
  name: string;
  parent: null | string;
  files: (Dir | File)[];
}

const lines = input.split("\n");

const formatOutput = (output: string[], parent: string) => {
  return output.map((line) => {
    const [left, right] = line.split(" ");
    if (left === "dir") {
      return {
        id: nanoid(),
        name: right,
        files: [],
        parent,
      };
    }

    return {
      name: right,
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
    processed: Dir[],
    currentNode: string,
  ): Error | Dir[] => {
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

      const formatted = formatOutput(output, currentNode);

      console.log(formatted);

      return processLine(next, processed, currentNode);
    }

    if (command === "cd") {
      // @TODO
      // - Explicityly handle `/` and go to `rootNode`
      if (instructions === '/') {
        return processLine(tail, processed, rootNode);
      }
      
      
      const validChildren = processed.filter(item => item.parent === currentNode);
      const targetDir = validChildren.find(item => item.name === instructions);
      if (targetDir === undefined) {
        return new Error(`Attempted to access dir '${instructions}' before listing it.`);
      }
      return processLine(tail, processed, targetDir.id);
    }

    return new Error(`Invalid command found, '${command}'`);
  };

  // @NOTE
  // - We know `/` has to exist so we feed it in as a default
  return processLine(payload, [{
    id: rootNode,
    name: "/",
    files: [],
    parent: null,
  }], rootNode);
};

console.log(processLines(lines));
