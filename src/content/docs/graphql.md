---
title: GraphQL v1beta
---

## Infomation

<p>
Beta support for <a href="https://graphql.org/">GraphQL</a> is rolling out starting April 2021
</p>

<p>
A free rate-limited endpoint is available at <a href="https://beta.pokeapi.co/graphql/v1beta">beta.pokeapi.co/graphql/v1beta</a>. This endpoint can be subject to changes in future. Only POST requests are allowed.
</p>
<p>
To ease learning and developing, a <a href="https://github.com/graphql/graphiql">GraphiQL</a> interface is hosted at <a href="https://beta.pokeapi.co/graphql/console/">beta.pokeapi.co/graphql/console/</a>. This console loads PokeAPI's GraphQL schema and offers a handy Explorer that can be used to create GraphQL queries. GraphQL queries are still HTTP queries so you can use your favorite tool/library to query the GraphQL endpoint. Follows an example using Curl.
</p>

```sh
# This curl retrieves all items and relative costs
curl 'https://beta.pokeapi.co/graphql/v1beta' \\
-H 'content-type: application/json' \\
-H 'accept: */*' \\
--compressed \\
--data-binary @- << EOF
{
"query": "query getItems{pokemon_v2_item{name,cost}}",
"variables": null,
"operationName":"getItems"
}
EOF
```

<p>
A Node example and some GQL queries are available <a href="https://github.com/PokeAPI/pokeapi/tree/master/graphql/examples">here</a>.
</p>

<h2 id="fairuse">Fair Use Policy</h2>

<p>
PokéAPI is free and open to use. It is also very popular. Because of this, we ask every developer to abide by our fair use policy. People not complying with the fair use policy will have their IP address permanently banned.
</p>

<p>
PokéAPI is primarily an educational tool, and we will not tolerate denial of service attacks preventing people from learning.
</p>

### Rules:

- Locally cache resources whenever you request them.
- Be nice and friendly to your fellow PokéAPI developers.
- If you spot security vulnerabilities act and <a href="https://github.com/PokeAPI/pokeapi/blob/master/SECURITY.md#reporting-a-vulnerability">report them</a> responsibly.
    

<h2 id="betastatus">Beta status</h2>
<p>
To reduce costs we are hosting the GraphQL API on a GCP e2-micro free instance. The machine can hardly support all the load of Hasura and Postgres thanks to some ingenious tweaks.
</p>
<p>
    Nonetheless this has a cost to the user experience. A 100 calls/h per IP rate-limit is put in place, the instance is set to reboot every day at 1AM UTC with a consequent 2 minutes of downtime, every successfull HTTP response is cached server-side, sporadic maintenance and testing might stop the service.
</p>
