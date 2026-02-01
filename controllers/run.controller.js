export const runCode = async (req, res) => {
  const { code, testCases } = req.body;

  try {
    let output = "";

    for (let test of testCases) {
      const func = eval(`
        ${code}
        twoSum
      `);

      const [nums, target] = test.input.split(",");
      const result = func(JSON.parse(nums), Number(target));

      output += `Input: ${test.input}\nOutput: ${JSON.stringify(result)}\n\n`;
    }

    res.json({ output });
  } catch (err) {
    res.json({ output: err.toString() });
  }
};
