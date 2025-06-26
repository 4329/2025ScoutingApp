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
# For a New Season
With each new season, you will need to update the code to reflect that season's changes.
## Database Layout
Begin at [seed.ts](app/lib/seed.ts), under the sql query for matches. Replace all keys beginning with auto_, teleop_, or endgame_ other than auto_total, teleop_total, and endgame_total.
```pgsql
CREATE TABLE IF NOT EXISTS matches (
  event_name text NOT NULL,
  match_num int NOT NULL,
  team_num text NOT NULL,
  is_red bool,

  auto_key1 type1,
  ...
  auto_total int,

  teleop_key1 type2,
  ...
  teleop_total int,

  endgame_key1 type3,
  ...
  endgame_total int,

  match_total int,

  defense bool,
  died bool,

  submitter_name text,
  end_match_notes text,

  PRIMARY KEY (event_name, match_num, team_num)
);
```
> [!TIP]
> enum types are very useful in certain situations, like this example here
> ```pgsql
> DO $$ BEGIN
>     CREATE TYPE endgame_style AS ENUM ( 'nothing', 'park', 'shallow', 'deep' );
>   EXCEPTION
>     WHEN duplicate_object THEN null;
> END $$;
> ```

## Typescript
Now, navigate to [match.ts](app.lib/match.ts) for type setup. the `State` type should accurately reflect the match table, so add proper types to coordinate that. Additionally, make sure to create matching typescript types for any custom ones you made using postgresql. 
```typescript
export type state = {
  "event_name": string,
  "match_num": number,
  "team_num": string,
  "is_red": boolean,

  "key1": type1,
  ...

  "match_total": number,

  "defense": boolean,
  "died": boolean,

  "submitter_name": string,
  "end_match_notes": string,
}
```

Next, go to `defaultState`, and add a default value for every key which you want to be reset when a new match is selected in the ScoutingApp.
> [!WARNING]
> Only add default keys which you wish to be reset when a new match is selected. Do not add a default value for match_num or team_num under any circumstances whatsoever.
```typescript
export const defaultState: any {
  "key1": defaultValue1,
  ...
};
```

Now, `scores` should be updated, so that each key is matched with its score. You can find the proper number in this year's Game Manual
```typescript
const scores: Map<string, number> = new Map([
  ["key1", scoreValue1],
  ...
])
```
### Custom Types and Booleans
Custom types and booleans will require a special case in the methods transforming between state and score. For booleans, add the following code in `scoreToState`, and you are done.
```typescript
if (key == "booleankey") return value == scores.get("booleankey");
```
With enums, this is rather more involved. First, create a map like so
```typescript
const enumScores: Map<string, number> = new Map({
  ["enumVal1", scoreValue1],
  ...
});
```
Then, add the following in `scoreToState`
```typescript
if (key == "enumkey") {
  for (let [k, v] of enumScores.entries()) {
    if (v == value) return k;
  }
}
```
and in `stateToScore`
```typescript
if (key == "enumkey") return enumScores.get(value as string) ?? 0;
```
## Publishing
Now, go to [publisher.ts](app/lib/publisher.ts). For any enums, ensure that their enum value rather than score is published by adding them to the top's declaration like this
```typescript
let sqled: any = {
  enumkey = toPublish.enumkey,
  ...
};
```
and place their keys in the filter
```typescript
Object.entries(toPublish)
  .filter(([k, _]) => !["enumkey", ...].includes(k))
  ...
```


Next will be the most tedious portion unless you are using vim, in which case there's a macro in a comment at the top of the file which you can shove into a register and run as many times as there are keys.

For those who aren't cool, begin with the sql query `INSERT INTO matches (`, and copy over every key from the matches table declaration.

Now, move to `VALUES (`, and write `${toPublish.key}` for every key from the matches table declaration.

Lastly, go to `DO UPDATE SET`, and do `key = EXCLUDED.key` for every key from the matches table.

Finished product should look something like
```pgsql
INSERT INTO matches (
  key1,
  ...
)

VALUES (
  ${sqled.key1},
  ...
)

ON CONFLICT(event_name, match_num, team_num)
DO UPDATE SET
  key1 = EXCLUDED.key1
  ...
```

## ScoutingApp
At last, you can update ScoutingApp. Go to [ScoutingDataInputter.tsx](app/ui/scoutingApp/ScoutingDataInputter.tsx). Use CoolSwitch for boolean values, and ImageCrementor for numberic ones.
For each widget, set `id="key"`, and `initial={initialStates.key}`.
```tsx
<CoolSwitch id="booleankey" title="Boolean Key" initial={initialStates.booleankey} />
<ImageCrementor id="numerickey" src="/image.jpg" title="Numeric Key" initial={initialStates.numerickey} />
```
### Enums
With enums, create a dropdown, where each option has `value="enumVal"`. Then, add a useState to the top of the function, and give the dropdown `setMatchNum={setUseState}`. Then, add an input `type="hidden`, set its id, and do `value={valUseState}`.
```tsx
const [valUseState, setUseState] = useState("");
...
<Dropdown setMatchNum={setUseState} initial={(initialstates.enumkey ?? "defaultVal").toString()}>
  <option value="enumValueOne">Enum Value One</option>
  ...
</Dropdown>
<input type="hidden" id="enumkey" value={valUseState} />
```
## Notes
The ScoutingApp uses a form, which loops over all input elements in order to determine values for publishing. You can use this principle in the creation of your own widgets. To have an input which is not published, set `name="hidden"`
