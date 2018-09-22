import gql from "graphql-tag";

// We use the gql tag to parse our query string into a query document

//Hello world sample, please remove
export const getSamData = gql`
query getSamData($cardId: String, $value: Int){
  getSamData(cardId: $cardId,value: $value) {
    id
    timestamp
    value
    tagid
    sign
  }
}
`;
