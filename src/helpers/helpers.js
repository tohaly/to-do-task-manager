import { MINIMUM_CHARACTERS } from "../constants/constants";

const simpleValidate = (ctx) => {
  if (
    typeof ctx.textHolder === "string" &&
    ctx.textHolder.length < MINIMUM_CHARACTERS
  ) {
    ctx.isButtonDisabled = true;
  } else {
    ctx.isButtonDisabled = false;
  }
};

export default { simpleValidate };
