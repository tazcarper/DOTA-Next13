import { HttpLink } from "@apollo/client";
export const httpLinkValues = new HttpLink({
  headers: {
    authorization:
      // TODO: Move this to env file
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiNmU1YzRhOGItNjk4Yy00NTdjLThlNjktYWIzNjBhOWNlMmFhIiwiU3RlYW1JZCI6Ijk0ODkwMDMiLCJuYmYiOjE2OTM1MDI3OTEsImV4cCI6MTcyNTAzODc5MSwiaWF0IjoxNjkzNTAyNzkxLCJpc3MiOiJodHRwczovL2FwaS5zdHJhdHouY29tIn0.fVrFzafYeibajZvfbjWrlpomNoLCP09Te2f5kHZXh0I",
  },
  uri: "https://api.stratz.com/graphql",
});
