# RPA case study source artwork

The three files here are the originals supplied by the client. They are kept
outside `public/` so they are not shipped to the browser.

| Source                                     | Becomes                                   |
| ------------------------------------------ | ----------------------------------------- |
| `4d540db4-...png` 1672x941, 2.0 MB          | `public/work/rpa/hero.webp` 202 KB        |
| `cdb0eb62-...png` 1254x1254, 1.6 MB         | `public/work/rpa/workflow.webp` 129 KB    |
| `95307f87-...png` 1774x887, 726 KB          | `public/work/rpa/logo.png` + `logo-dark.png` |

The logo arrived as black-on-white raster. It was converted to straight alpha,
trimmed to its bounding box and scaled to 600px wide. `logo-dark.png` is the
same mark with the neutral ink mapped to white and the blue dots left alone, so
it reads on the dark canvas without an invert filter distorting the blue.

`app-case-logo` picks the variant in CSS off `[data-theme]`, which keeps the
prerendered page from flashing the wrong one before hydration.

To regenerate, adapt the script recorded in the commit that added these assets.
