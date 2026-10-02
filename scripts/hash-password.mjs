import bcrypt from "bcryptjs";

function readPassword() {
  const input = process.stdin;
  if (!input.isTTY) {
    throw new Error("Run this command in an interactive terminal.");
  }

  return new Promise((resolve, reject) => {
    let password = "";
    input.setRawMode(true);
    input.setEncoding("utf8");
    input.resume();
    process.stdout.write("Owner password (input hidden): ");

    const onData = (chunk) => {
      for (const character of chunk) {
        if (character === "\u0003") {
          input.setRawMode(false);
          input.pause();
          process.stdout.write("\nCancelled.\n");
          reject(new Error("Password hashing cancelled."));
          return;
        }
        if (character === "\r" || character === "\n") {
          input.setRawMode(false);
          input.pause();
          input.off("data", onData);
          process.stdout.write("\n");
          resolve(password);
          return;
        }
        if (character === "\u007f" || character === "\b") {
          password = password.slice(0, -1);
        } else {
          password += character;
        }
      }
    };

    input.on("data", onData);
  });
}

const password = await readPassword();
if (password.length < 8) {
  throw new Error("Use a password with at least 8 characters.");
}

console.log(await bcrypt.hash(password, 12));
