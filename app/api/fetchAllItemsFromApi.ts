export const fetchAllItemsFromApi = async (): Promise<Item[]> => {
  try {
    const baseUrl = 'https://swapi.dev/api/people';
    const response = await fetch(baseUrl);
    const data = await response.json();
    const count = data.count;
    const totalPages = Math.ceil(count / 10);

    const itemPromises = Array.from({length: totalPages}, (_, index) =>
      fetch(`${baseUrl}?page=${index + 1}`)
        .then(res => res.json())
        .then(res => res.results),
    );
    const items = await Promise.all(itemPromises).then(results =>
      results.flat(),
    );

    return items;
  } catch (error: any) {
    throw new Error(error.message as string);
  }
};
