---
title: About
---

### What is this?

This website provides a RESTful API interface to highly detailed objects built from thousands of lines of data related to [Pokémon](https://en.wikipedia.org/wiki/Pokemon). We specifically cover the video game franchise. Using this website, you can consume information on Pokémon, their moves, abilities, types, egg groups and much, much more.

### What is an API?

An API (Application Programming Interface) is a contract that allow developers to interact with an application through a set of interfaces. In this case, the application is a database of thousands of Pokémon-related objects, and the interfaces are URL links.

A RESTful API is an API that conforms to a set of loose conventions based on HTTP verbs, errors, and hyperlinks.

### Aren't there 101 other Pokémon websites already?

Yes and that's exactly the problem!

101 instances of the same website means 101 instances of the **same data**.

We aim to provide a **single source of data** that any number of other websites can consume and use.

Often, and especially when new Pokémon games or updates are released, those 101+ websites take **weeks** to update as people have to enter the same information in all those different places.

This solves that problem. If all those sites consumed their data from here, they would have the exact same information that is updated at exactly the same time, with no errors between each website. The overall benefit is a better collaboration and consistency across all the different Pokémon websites and applications. It's good for all!

### How much information is stored here?

A lot.

We currently have **tens of thousands** of individual items in our database, including:

- Moves
- Abilities
- Pokémon (including various forms)
- Types
- Egg Groups
- Game Versions
- Items
- Pokédexes
- Pokémon Evolution Chains

And that's just scratching the surface! To see all the different types of data we have, check out [the docs](../docs/v2).

### The API is missing stuff!

We know! Feel free to contribute to open issues on [GitHub](https://github.com/PokeAPI/pokeapi/).

Have ideas for new features? We're on Slack! Sign up [right here](https://join.slack.com/t/pokeapi/shared_invite/zt-1l4vpwa8k-muQmMrFfv7TIFGrVWzjzcw)</a> then visit our [slack team](https://pokeapi.slack.com).

### So who built this?

PokéAPI V1 was created by [Paul Hallett](https://github.com/phalt) as a weekend project but it quickly became more than a weekend's worth of work. In December of 2014 Paul deprecated V1 in favor of working on V2.

This is where[Zane Adickes](https://github.com/zaneadix)jumped in. Zane thought the original project was a fantastic idea and wanted to help it grow. With direction from Paul, Zane created the V2 API using an exact mirror of[Veekun's](https://github.com/eevee) data relatedto the main series of games.

During summer 2018, Paul decided to hand over the project to the community. This is where Tim Malone, Mark Tse, Sargun Vohra, Charles Marttinen, Alessandro Pezzé, Alberto Oliveira da Silva, and Lucio Merotta came together and started planning how to change the infrastructure in order to improve performance and cut down on hosting costs. An important step was to convert the API to serve static JSON files, which was made possible by Sargun and his excellent [PokeAPI/ditto](https://github.com/PokeAPI/ditto) tool. The frontend website was also re-built by Charles at the same time. The whole process was completed in October 2018.

After this massive redesign, PokéAPI gained many new consumers due to its new blazing fast performance. To give a quick reference, the loading of the infamous [Magikarp pokemon resouce](https://pokeapi.co/api/v2/pokemon/magikarp) passed from seconds to ~80ms.

An important milestone for the PokéAPI project happened shortly after in summer 2020, when its GitHub repository reached **2000 stargazers** and in a single month fulfilled **100 million** API calls.

In August 2020 the PokéAPI community decided [to temporarily fork](https://github.com/PokeAPI/pokeapi/issues/520) [veekun/pokedex](https://github.com/veekun/pokedex), which was the primary and only source of data. This operation was planned in order to add new generation-8 data, which Veekun lacked. The following people contributed to fetching and formatting generation-8 and newer data: [Alessandro Pezzé](https://github.com/Naramsim), [Hoang Quoc Trung](https://github.com/ichbinfrog), [Chandler Mahkorn](https://github.com/CMahk), [André Sousa](https://github.com/AndreArrebola), [Alexander Whan](https://github.com/alex-whan), [Austin Jones](https://github.com/myoKun345), [tomi-912](https://github.com/tomi-912), [Eric Donders](https://github.com/ercdndrs), [Gaël Dottel](https://github.com/pifopi), [Parnassius](https://github.com/Parnassius) and [Anh Thang](https://github.com/anhthang).

In January 2023 [bitomic](https://github.com/bitomic), [Kohki Miki](https://github.com/giginet), [Paul-Émile](https://github.com/pebou), [tillfox](https://github.com/tillfox) scraped generation 9 data from the web and added it here.

The current owners of the PokéAPI project are [Paul Hallet](https://github.com/phalt), [Tim Malone](https://github.com/tdmalone) and [Alessandro Pezzé](https://github.com/Naramsim). Alongside them other core maintainers include [Charles Marttinen](https://github.com/cmmartti) and [Sargun Vohra](https://github.com/sargunv).

We also have a [GitHub organization](https://github.com/pokeapi) of contributors that you are welcome to join!

### Where did you get all of this data?

We gathered the information on this site from various resources:

[Veekun](https://github.com/veekun) has a fantastic [Pokedex](http://veekun.com/dex) which is also an open source [project](https://github.com/veekun/pokedex) containing a ton of csv data. We used this to flesh out the database that powers Pokéapi.

Newer data is scraped from different resources which are considered to be trustful.

### What's the technology stack?

Up until November 2018, the API and website were built together in a single[Python](https://python.org) project using the [Django framework](https://djangoproject.com) and paired with a [PostgreSQL](https://www.postgresql.org) database to store the data. [Django REST Framework](http://www.django-rest-framework.org/) was used to expose the data through a RESTful API. The entire stack was deployed at [DigitalOcean](https://www.digitalocean.com/), initially paid by Paul and then sponsored directly by DigitalOcean itself.

In October 2018, the API was converted to serve static JSON files in a fully backwards compatible manner. This allowed PokéAPI to move its hosting to a cheap static hosting solution ([Firebase](https://firebase.google.com/) Hosting + [Cloudflare](https://www.cloudflare.com/) Caching), which increased performance and stability by a drastic margin.

The move to static hosting was solved by introducing a build step before deployment performed by [CircleCI](https://circleci.com/), our build system. This build step starts a local Django copy of [PokeAPI/pokeapi](https://github.com/PokeAPI/pokeapi) and saves each possible endpoint as a JSON file using [PokeAPI/ditto](https://github.com/PokeAPI/ditto). All these JSON files are then uploaded to Firebase and served to the public through a [Firebase function](https://github.com/PokeAPI/deploy) actioned by CircleCI.

This website now uses [Astro](https://github.com/withastro/astro) and the code lives in its own GitHub project at [PokeAPI/pokeapi.co](https://github.com/PokeAPI/pokeapi.co). Again, CircleCI takes care of deploying it on Firebase as static files.