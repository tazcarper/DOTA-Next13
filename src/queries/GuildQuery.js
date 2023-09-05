import { gql } from "@apollo/client";

const GuildQuery = gql`
  query GuildQuery($steamAccountIds: [Long]!) {
    players(steamAccountIds: $steamAccountIds) {
      steamAccount {
        name
        id
      }
      matches(request: { take: 5 }) {
        id

        players {
          kills
          deaths
          assists
          isVictory
          steamAccount {
            id
          }
          hero {
            shortName
            displayName
          }
        }
      }
    }
  }
`;

export default GuildQuery;
