import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: import.meta.env.NODE_ENV === 'dev' ? 'local' : 'github',
    repo: 'hoyt-steele-design/temtefadezzz'
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/posts',
              publicPath: '../../assets/images/posts/',
            },
          },
        }),
      },
    }),
  },
});
