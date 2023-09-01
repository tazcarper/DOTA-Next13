import { gql } from "@apollo/client";

const PlayerQuery = gql`
  query PlayerQuery($steamAccountId: Long!) {
    player(steamAccountId: $steamAccountId) {
      behaviorScore
      steamAccount {
        name
      }
      matches(request: { take: 5 }) {
        id
        players(steamAccountId: $steamAccountId) {
          matchId
          steamAccountId
          role
          isVictory
          hero {
            id
            displayName
            shortName
          }
          kills
          deaths
          assists
        }
      }
    }
  }
`;

export default PlayerQuery;
