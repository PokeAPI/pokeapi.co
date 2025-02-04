---
title: GraphQL v1beta
---

## Infomation

Beta support for [GraphQL](https://graphql.org/) is rolling out starting April 2021

A free rate-limited endpoint is available at [beta.pokeapi.co/graphql/v1beta](https://beta.pokeapi.co/graphql/v1beta). This endpoint can be subject to changes in future. Only POST requests are allowed.

To ease learning and developing, a [GraphiQL](https://github.com/graphql/graphiql) interface is hosted at [beta.pokeapi.co/graphql/console/](https://beta.pokeapi.co/graphql/console/). This console loads PokeAPI's GraphQL schema and offers a handy Explorer that can be used to create GraphQL queries. GraphQL queries are still HTTP queries so you can use your favorite tool/library to query the GraphQL endpoint. Follows an example using Curl.

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

Some code examples and GQL queries are available [here](https://github.com/PokeAPI/pokeapi/tree/master/graphql/examples).

### Fair Use Policy

PokéAPI is free and open to use. It is also very popular. Because of this, we ask every developer to abide by our fair use policy. People not complying with the fair use policy will have their IP address permanently banned.

PokéAPI is primarily an educational tool, and we will not tolerate denial of service attacks preventing people from learning.

### Rules

- Locally cache resources whenever you request them.
- Be nice and friendly to your fellow PokéAPI developers.
- If you spot security vulnerabilities act and [report them](https://github.com/PokeAPI/pokeapi/blob/master/SECURITY.md#reporting-a-vulnerability) responsibly.


### Beta status

To reduce costs we are hosting the GraphQL API on a GCP e2-micro free instance. The machine can hardly support all the load of Hasura and Postgres thanks to some ingenious tweaks.

Nonetheless this has a cost to the user experience. A 100 calls/h per IP rate-limit is put in place, the instance is set to reboot every day at 1AM UTC with a consequent 2 minutes of downtime, every successfull HTTP response is cached server-side, sporadic maintenance and testing might stop the service.
