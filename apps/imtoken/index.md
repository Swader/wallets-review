# imToken

imToken is popular and well liked wallet that's been around for a while. As of recently, it also supports pairing with a bluetooth hardware wallet not unlike a [Ledger Nano X](https://www.ledger.com/?r=7410), though this one - called imKey - is only compatible with imToken. The wallet is closed source, so a bit of a walled garden in that regard, but the team seems heavily invested in continuing the development and finding new business models for the app, so its continued existence is not in question.

> The UX was given much thought, as imToken is a thoroughly polished product.

## UX and Dapps

The UX was given much thought; imToken is a thoroughly polished product. 

Assets - which include Ether and derivative tokens, Bitcoin, EOS and ATOM - are easy to manage and review and wallets are easy to switch. Added features are thoroughly excellent (e.g. instant trades via imToken's own TokenIon service or KyberSwap), price pairs from various exchanges can be inspected on a separate screen, and there's even the ability to stake ATOM and LOOM tokens and to earn interest via built-in DeFi lending (redirection to Compound but still). In terms of user-oriented features, this is probably the most feature-complete wallet we've ever used.

The dapp browser comes with a wide range of recommended dapps, from DEXes and ENS services to games and social networks, and supports privacy mode which lets users decide whether or not dapps have to ask for permission to read information from the user's active wallet. It remains to be seen how imToken will handle Apple's recent hostility towards built in dapp stores in wallets.

TWEET FROM TRUST WALLET

The wallet supports basic Ethereum addresses as codes, and even prefixes as per EIP-831, but does not conform to EIP-681 with regards to parsing values and amounts. Whole numbers passed as `value` will be read as Wei, while they will produce Eth when passed in as `amount` - so the reverse of what it should be.

Unfortunately, ENS support seems to be buggy right now and won't resolve a single domain we've tried, though the skeleton for support is there.

The app is maintained for both Android and iOS.

> Biometrics support is excellent

## Security and Safety

Biometrics support is excellent. imToken allows securing both the app as a whole with a fingerprint and face ID, and also lets users replace individual wallet passwords with biometrics.

The app is closed source, so the safety of your keys is based on the imToken team's word - there is no way to tell if your phrase or private key _really_ only stay on the device without a thorough security audit.

There's no KYC.

> Developers could do with more tooling

## DX

It is possible to switch mainnet node to a custom one, but it is not possible to go to a fully custom network. As such, imToken is not very proof-of-concept or developer friendly.

Adding custom tokens is easy, however. Not only will imToken auto-detect random tokens sent to you, it will also provide you with separate interfaces in which to track junk tokens, tokens you got on purpose, tokens you custom-added, and more. This goes for collectibles as well.

> Switching identities is quick and easy

## Multi-account support

imToken lets users import via phrase, key, and keystore as well as offering a watch-only mode. That last one needs work as it's confusing and buggy. During import via phrase, imToken will ask the user for the derivation path, allowing for two default presets and a custom one which is fully editable by the user. In order to add wallets on different derivation paths, the user must repeat the import process and supply a different path - the app will not auto-scan paths to any depth.

Switching identities is quick and easy - all it takes is a tap in the left sidebar when summoned. There is no way to log out of the application and clear your accounts to start over. What ever you've imported is there and the only way to get a completely new account going with nothing added is to fully clear the app's data.

Transactions and balances are shown for each active wallet separately.

This application also has a pretty serious privacy leak in that it does not clear browser cache when switch accounts, meaning your previous visits can be logged and your various identities linked.

> Passive income opportunities abound

## Other Considerations

Bonus features include DeFi and staking. One can very easily use [Compound](https://bitfalls.com/2019/01/22/make-your-crypto-work-for-you-earning-interest-on-crypto-loans/) or similar to lend DAI and earn interest, and staking via both Atom and [Loom](https://bitfalls.com/2019/04/12/staking-sa-loom-om-pasivna-zarada-dok-osiguravate-blockchain/) are at one's fingertips at all times.

> A feature-rich application that appeals to both power users and newbies

## Conclusion

imToken is a powerful application and a good first choice for any newcomer. Not only is it packed with excellent features that apply to both power users and newbies, but it actively encourages users to participate in this ecosystem by teaching them how to stake, use DeFi and interact with dapps - something every wallet should do more of.

If you're not a stickler for open source and don't care about being able to connect to custom or private blockchains, imToken is an excellent first choice for a multi-chain wallet.