import { config, singleton, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'github',
    repo: 'hoyt-steele-design/temte-fadezzz',
    branchPrefix: 'content/',
  },
  singletons: {
    hero: singleton({
      label: 'Hero Section',
      path: 'src/content/hero',
      schema: {
        backgroundImageMobile: fields.image({
          label: 'Background Image (Mobile)',
          directory: 'public/images/hero',
          publicPath: '/images/hero',
        }),
        backgroundImageDesktop: fields.image({
          label: 'Background Image (Desktop)',
          directory: 'public/images/hero',
          publicPath: '/images/hero',
        }),
      },
    }),
    about: singleton({
      label: 'About Me Section',
      path: 'src/content/about',
      schema: {
        photo: fields.image({
          label: 'Photo',
          directory: 'public/images/about',
          publicPath: '/images/about',
        }),
        headline: fields.text({ label: 'Headline' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Value' }),
            label: fields.text({ label: 'Label' }),
          }),
          { label: 'Stats', itemLabel: (props) => props.fields.label.value }
        ),
        testimonials: fields.array(
          fields.object({
            quote: fields.text({ label: 'Quote', multiline: true }),
            author: fields.text({ label: 'Author' }),
          }),
          {
            label: 'Testimonials',
            itemLabel: (props) => props.fields.author.value,
          }
        ),
      },
    }),
    portfolio: singleton({
      label: 'Portfolio Section',
      path: 'src/content/portfolio',
      schema: Object.fromEntries(
        Array.from({ length: 6 }, (_, i) => [
          `photo${i + 1}`,
          fields.object(
            {
              image: fields.image({
                label: 'Image',
                directory: 'public/images/portfolio',
                publicPath: '/images/portfolio',
              }),
              alt: fields.text({ label: 'Alt Text' }),
            },
            { label: `Photo ${i + 1}` }
          ),
        ])
      ),
    }),
    services: singleton({
      label: 'Services Section',
      path: 'src/content/services',
      schema: {
        disclaimer: fields.text({ label: 'Disclaimer' }),
        serviceGroups: fields.array(
          fields.object({
            category: fields.text({ label: 'Category' }),
            services: fields.array(
              fields.object({
                name: fields.text({ label: 'Name' }),
                description: fields.text({
                  label: 'Description',
                  multiline: true,
                }),
                price: fields.text({ label: 'Price' }),
                duration: fields.text({ label: 'Duration' }),
              }),
              {
                label: 'Services',
                itemLabel: (props) => props.fields.name.value,
              }
            ),
          }),
          {
            label: 'Service Groups',
            itemLabel: (props) => props.fields.category.value,
          }
        ),
      },
    }),
    location: singleton({
      label: 'Location Section',
      path: 'src/content/location',
      schema: {
        locationImage: fields.image({
          label: 'Location Image',
          directory: 'public/images/location',
          publicPath: '/images/location',
        }),
        address: fields.text({ label: 'Address' }),
        mapUrl: fields.text({ label: 'Map URL' }),
        hours: fields.array(
          fields.object({
            day: fields.text({ label: 'Day' }),
            isClosed: fields.checkbox({ label: 'Closed' }),
            slots: fields.array(fields.text({ label: 'Time Slot' }), {
              label: 'Time Slots',
            }),
          }),
          { label: 'Hours', itemLabel: (props) => props.fields.day.value }
        ),
      },
    }),
    settings: singleton({
      label: 'Site Settings',
      path: 'src/content/settings',
      schema: {
        bookingUrl: fields.text({ label: 'Booking URL' }),
        copyrightText: fields.text({ label: 'Copyright Text' }),
      },
    }),
  },
})
