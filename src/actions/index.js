const GO_DETAIL = 'GO_DETAIL';
const LOAD_TOPICS = 'LOAD_TOPICS';

export function goDetail() {
  return {
    type: GO_DETAIL,
  };
}

export function loadTopics(topics) {
  return {
    type: LOAD_TOPICS,
    topics,
  };
}
