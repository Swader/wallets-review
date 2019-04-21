Source for https://wallets.review.

This website has ads. The revenue from ads is wholly used to fund bounties for development. See Contributing below.

## Contributing

Before contributing for free, check if there's anything funded [on Gitcoin](https://gitcoin.co/explorer?network=mainnet&idx_status=open&keywords=wallets-review&order_by=-web3_created).

1. Fork
2. Clone
3. Modify and test locally.
4. Submit PR

Caveats:

- use of NodeJS is forbidden
- use of JS frameworks is forbidden
- lighthouse score must be kept same or better (see issue #4)

## Questions I anticipate people will ask

#### Why a static site without NodeJS?

Because JavaScript is a toy language that should never have gotten as far as it did, and people maintaining it and building tools for its ecosystem are amateurs. This is not bias, it is fact. There is no excuse for the package management system of a language to be so horrible, not after countless other languages have solved this issue. 

Rather than spend every day debugging the NPM process anew, I opted to avoid the NodeJS ecosystem entirely and build a website the old-fashioned way: with HTML, a bit of jQuery, and some plain old CSS. It works, and it works anywhere in the exact same way.

#### Doesn't this make maintenance hard?

Not at all, it makes it infinitely easier. Write code. Check if it works. Push. Done. No build, no `ERR` diarrhea all over my screen on update/install, no symlink/filepath length problems on Windows.

#### Why was this made?

I needed to build a voting dapp for a [self-regulating blockchain NGO](https://ubik.hr) in Croatia. I wanted to build it on our national testnet, [Lisinski](https://lisinski.online). It was hard to find a wallet which supports fully custom Ethereum networks AND custom tokens, so I figured I'd build a site which lets you filter wallets based on such and similar attributes.

#### Who is funding this?

[Bitfalls.com](https://bitfalls.com) currently. Ad revenue in the future, hopefully. All proceeds to directly into development and content-writing bounties on Gitcoin to improve the site.

#### Why hasn't {my favorite wallet} been added?

I haven't gotten around to it, or haven't heard of it. Please [leave an issue](https://github.com/Swader/wallets-review/issues) and I'll take a look as soon as time permits. Alternatively, submit your own review as a PR, it's fine as long as you also do the other work of adding attributes etc.

#### What's stopping me from cloning your site and pushing my own reviews live?

Nothing, go for it I guess. I'd rather you didn't, and the license disallows it, but realistically I have no way of enforcing that.

## LICENSE

Do not use any part of this website for any reason without [asking me](mailto:contact@bitfalls.com) first.