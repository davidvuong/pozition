import { AxiosRequestConfig } from 'axios';

export const URL =
  'https://api.thegraph.com/subgraphs/name/fritzschoff/pozitionsmainnet';

export const graphQueryConfig: AxiosRequestConfig = {
  url: URL,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  data: {
    query: `{
      positionOpeneds {
        id
    position
    size
    margin
    trader
    margin
    market
      }
    }
    `,
  },
};
