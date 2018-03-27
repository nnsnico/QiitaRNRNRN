const response = 'https://qiita.com/api/v2/items';

export function getTopics() {
  return fetch(response)
    .then(res => res.json());
}
