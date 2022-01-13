export default {
  // 支持自定义函数，API 参考 express@4
  'POST /api/upload': (req: any, res: any) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
      name: 'xxx.png',
      status: 'error',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    });
  },
};
