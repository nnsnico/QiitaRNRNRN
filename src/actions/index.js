const GO_DETAIL = 'GO_DETAIL';
const LOAD_TOPICS = 'LOAD_TOPICS';

export function goDetail(topic) {
  return {
    type: GO_DETAIL,
    topic,
  };
}

export function loadTopics(topics) {
  return {
    type: LOAD_TOPICS,
    topics,
  };
}
