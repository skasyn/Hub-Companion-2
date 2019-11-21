import {handleErrors_login} from "./utils";
import {getActivities} from "./refresh";

require('dotenv').config();

export async function refresh(parent, args, context, userId) {
  // TODO: Change into custom fields
  const year = "2019";
  const hubModule = "B-INN-000";
  const city = "PAR";

  await getActivities(year, hubModule, city);
  return true;
}


export const Mutation = {
  refresh: handleErrors_login(refresh),
};