import { gql } from "@apollo/client";

const PlayerQuery = gql`
  query PlayerMatchesQuery(
    $steamAccountId: Long!
    $startDateTime: Long
    $take: Int = 5
    $after: Long
  ) {
    player(steamAccountId: $steamAccountId) {
      matches(
        request: { startDateTime: $startDateTime, take: $take, after: $after }
      ) {
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
            runes {
              rune
            }
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
