# [paullj.github.io](https://paullj.github.io)

![Screenshot of Website](https://raw.githubusercontent.com/paullj/paullj.github.io/main/screenshot.png)

### Features and To Do
- [x] Fully static, hostable on Github Pages
- [x] Responsive design with [UnoCSS](https://github.com/antfu/unocss)
- [x] [GitHub Discusions as a CMS](https://github.com/paullj/paullj.github.io/discussions/20)
- [x] [Comments](https://github.com/paullj/paullj.github.io/discussions/20#discussioncomment-2132732) and reactions on each post
- [x] Automatic deployment with GitHub Actions
- [x] Works without Javascript if needed
- [x] Performant
- [x] Basic SEO
- [x] [Automatic dark mode](https://github.com/paullj/paullj.github.io/blob/main/src/lib/components/ToggleDarkMode.svelte)
- [x] Privacy focused [analytics](https://www.goatcounter.com/)
- [ ] RSS feed
- [ ] Better error page, with suggestions
- [ ] Post search
- [ ] Post pagination
- [x] View counter

# Running your own version of this website
- Remember to change values in `src/lib/siteConfig.ts`
- Make sure `package.json` has correct repository information
- Make **Published Posts** and **Draft Posts** discussion categories and make sure they are set to announcement
- For comments to work make sure
  - Repository is public, otherwise visitors will not be able to view the discussion.
  - The giscus app is installed, otherwise visitors will not be able to comment and react.
  - The Discussions feature is turned on by enabling it for your repository.
- When running in dev make sure `GITHUB_TOKEN=your_token` can be found [here](https://github.com/settings/tokens)
- You have a GoatCounter account for analytics
