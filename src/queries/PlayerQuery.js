import { gql } from "@apollo/client";

const PlayerQuery = gql`
  query PlayerQuery($steamAccountId: Long!) {
    player(steamAccountId: $steamAccountId) {
      steamAccount {
        id
        name
        avatar
      }
      behaviorScore
      guildMember {
        guildId
        guild {
          name
          memberCount
          members {
            steamAccountId
          }
        }
      }
      matches(request: { take: 5 }) {
        id
        startDateTime
        players(steamAccountId: $steamAccountId) {
          matchId
          steamAccountId
          role
          isVictory
          hero {
            id
            shortName
            displayName
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
