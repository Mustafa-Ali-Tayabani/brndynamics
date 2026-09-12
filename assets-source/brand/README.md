# Brand character

`public/brand/guide.png` is the cutout of the BrnDynamics figure used by the
lead capture panel on service and case study pages (`app-lead-guide`).

Drop the file at that path and it appears automatically. Nothing else to change.

| Requirement | Detail |
| ----------- | ------ |
| Path        | `public/brand/guide.png` |
| Background  | Transparent. The figure is placed over the live page. |
| Orientation | Portrait. The supplied cutout is 1129x1441. |
| Framing     | Full figure, standing on the bottom edge of the canvas. |
| Pose        | Pointing to the viewer's right, so the gesture leads into the panel. |

The image is never cropped. Its own ratio sets the rendered height, so any
portrait size works.

Until the file exists the panel still appears, just without the figure. The
component asks for the art once per browser session and remembers a miss, so a
missing file does not cost a request on every page. The image is attached on the
client only and kept out of the prerendered HTML, which is what makes that
possible.
