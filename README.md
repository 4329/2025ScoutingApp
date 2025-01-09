This is a [Next.js]     (https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
# Roboteers Scouting App
  This is not not not not the website for 4329 Lutheran Roboteersu. It contains our scouting data along with 
## Pages
- <b>Home</b>: Contains basic links for everything, and is static enough to be a good starting place if you're just learning react
- <b>Admin Panel</b>: pretty boring, but the sql queries are interesting if you haven't seen those before
- <b>Scouting App</b>: fairly basic, a good starting place for the way that react components work
- <b>Data Viewer</b>: rather complex, pretty annoying to change. Probably save this one for last

## Backend
&emsp;The backend is located inside of the lib folder. The seed file has a bunch of table declarations, which will be called only once when the app is first deployed. Changing these, then dropping the original table is the preferred way to alter a table. Publisher will also need to be changed, and is annoying enough that you should probably use a macro. Other files should hopefully not need to be changed.
