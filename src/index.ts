import * as action from "@actions/core";
import { context } from "@actions/github";
import { copy } from "./copy";

(async () => {
  try {
    const source = action.getInput("source") || ".";
    const filesPatterns = action.getMultilineInput("files");
    const operation = action.getInput("operation");
    switch (operation) {
      case "copy":
        const destination = action.getInput("destination");
        if (destination === "") {
          throw new Error("destination is required for the copy operation.");
        }
        const count = await copy(source, filesPatterns, destination);
        action.setOutput("count", count);
        break;
      default:
        throw new Error(`Invalid operation: ${operation}`);
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      action.setFailed(error);
    } else {
      action.setFailed(`An unknown error occurred: ${error}`);
    }
  }
})();
