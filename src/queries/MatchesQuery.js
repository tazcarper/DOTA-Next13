import { gql } from "@apollo/client";

const PlayerQuery = gql`
  query PlayerMatchesQuery($steamAccountId: Long!) {
    player(steamAccountId: $steamAccountId) {
      matches(request: { startDateTime: 1693951373 }) {
        id
        startDateTime
        players(steamAccountId: $steamAccountId) {
          matchId
          isRadiant
          goldPerMinute
          gold
          heroDamage
          experiencePerMinute
          towerDamage
          heroHealing
          numLastHits
          intentionalFeeding
          award
          item0Id
          item1Id
          item2Id
          item3Id
          item4Id
          item5Id
          stats {
            wardDestruction {
              time
              gold
            }
            courierKills {
              positionX
              positionY
            }
            wards {
              positionX
              positionY
            }
            campStack
          }

          numDenies
          steamAccountId
          role
          isVictory
          hero {
            id
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
