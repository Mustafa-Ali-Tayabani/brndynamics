# Brand character

`public/brand/guide.webp` is the cutout of the BrnDynamics figure used by the
lead capture panel on service and case study pages (`app-lead-guide`).

Built from `guide-source.png` here: trimmed to its alpha bounding box, scaled
to 700px wide and re-encoded as WebP with alpha. That took 1.4 MB down to 77 KB.

| Requirement | Detail |
| ----------- | ------ |
| Path        | `public/brand/guide.webp` |
| Background  | Transparent. The figure is placed over the live page. |
| Orientation | Portrait. The supplied cutout is 1122x1402, trimmed to 1085x1372. |
| Framing     | Half figure, cut at the thigh, meeting the bottom edge of the canvas. |
| Pose        | Pointing to the viewer's right, so the gesture leads into the panel. |

The image is never cropped. Its own ratio sets the rendered height, so any
portrait size works.

Until the file exists the panel still appears, just without the figure. The
component asks for the art once per browser session and remembers a miss, so a
missing file does not cost a request on every page. The image is attached on the
client only and kept out of the prerendered HTML, which is what makes that
possible.
