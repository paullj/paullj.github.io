const hydrateAction = (
  node: HTMLElement,
  callback: () => string | number | Promise<string> | Promise<number>
): SvelteActionReturnType => {
  const update = async (node: HTMLElement) => {
    try {
      const data = await callback();
      node.innerHTML = data as string;
    } catch (error) {}
  };
  update(node);
};

export default hydrateAction;
