const hydrateAction = (
  node: HTMLElement,
  callback: () =>
    | boolean
    | string
    | number
    | Promise<string | boolean>
    | Promise<number | boolean>
): SvelteActionReturnType => {
  const update = async (node: HTMLElement) => {
    try {
      const data = await callback();
      if (data) node.innerHTML = data as string;
    } catch (error) {
      console.log(error);
    }
  };
  update(node);
};

export default hydrateAction;
