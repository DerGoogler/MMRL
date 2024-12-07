# Anti-Features in MMRL

MMRL supports like in F-Droid Anti-Features to mark module you may not like

Those Anti-Features can only be set from `track.json`.

```json
"antifeatures": ["Ads"]
```

## List

| Name                      | ID                | Description                                                                                  |
| ------------------------- | ----------------- | -------------------------------------------------------------------------------------------- |
| Ads                       | `Ads`             | Advertising                                                                                  |
| Tracking                  | `Tracking`        | Tracks and/or reports your activity to somewhere, even when it can be turned off             |
| Non-Free Network Services | `NonFreeNet`      | Promotes or depends entirely on a non-changeable or non-free network service                 |
| Non-Free Addons           | `NonFreeAdd`      | Promotes other non-libre module or plugins                                                   |
| Non-Free Dependencies     | `NonFreeDep`      | Needs a non-libre module to work (e.g. Google Maps, Market)                                  |
| NSFW                      | `NSFW`            | Contains content that the user may not want to be publicized or visible everywhere           |
| Upstream Non-Free         | `UpstreamNonFree` | Upstream source code is not libre, and this version has those parts replaced or rewritten    |
| Non-Free Assets           | `NonFreeAssets`   | Non-libre media in things that are not code (e.g. images, sound, music, 3D-models, or video) |
| Known Vulnerability       | `KnownVuln`       | Known security vulnerability                                                                 |
| No Source Since           | `NoSourceSince`   | Source code no longer available, making new releases impossible                              |
| Obfuscation               | `Obfuscation`     | Module includes obfuscated code                                                              |
| Unasked removal           | `UnaskedRemoval`  | Module removes app, permissions and other modules without approval                           |
