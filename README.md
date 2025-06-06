# Quickstart
install dependencies with  
```
npm i -f
```
create a Vercel account, then run
```
npx vercel link
```
Now, on the Vercel website, go to your dashboard and select the project you just linked with. Click on the storage tab, then create database. Select Neon.
then, to finish all of the command line setup, run
```
npx vercel env pull
npx auth secret
```
Now, run the website with
```
npm run dev
```
That command will output a url. When you open it for the first time, it will set up your database. Then, click on the hamburger menu at top left, and select admin panel. The default admin will have an email of admin@admin, and password of 0123.  
Using the admin panel, you can enter a TheBlueAlliance event key, which will fill out the matches for your event.
> [!TIP]
> TheBlueAlliance tends to only fill out match schedules at the last minute, so you will likely have to do this at the event.


You can also add more admins, and doing so will delete the default one. Lastly, the check tables button simply rensures that your database is set up properly.
Now you can finally run
```
npx vercel --prod
```
This will create a production website, the link to which can be found on Vercel's dashboard, and shared with your team.
