## Block.xyz copy challenge

Using Three.js, React and Typescript.

## How to run

First you have to do

```
npm install
```

After that, just 

```
npm run dev
```

and it will work.


## Change image as background

In order to make it work, you'll need a .hdr file.

First you'll have to move the .hdr file into the img folder inside of src folder.

Finally, change the ``image.hdr`` from the following lines in App.tsx:

```typescript
  const hdrTextureURL = new URL(
    "../src/img/image.hdr",
    import.meta.url
  ).toString();
```
