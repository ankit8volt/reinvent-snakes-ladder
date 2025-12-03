# GitHub Wiki Setup Guide

This guide explains how to set up the GitHub wiki for this project.

## Option 1: Automatic Wiki Setup (Recommended)

GitHub can automatically use the `docs/` folder as wiki content.

### Steps:

1. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to "Pages" section
   - Select source: "Deploy from a branch"
   - Select branch: `main` and folder: `/docs`
   - Click "Save"

2. **Access Documentation**
   - Your docs will be available at: `https://username.github.io/repo-name/`
   - Home page will be at: `https://username.github.io/repo-name/Home.html`

3. **Update Links**
   - All markdown files in `docs/` are automatically converted to HTML
   - Links work automatically (`.md` becomes `.html`)

## Option 2: Manual Wiki Setup

If you prefer using GitHub's built-in wiki feature:

### Steps:

1. **Enable Wiki**
   - Go to repository Settings
   - Check "Wikis" under Features
   - Click "Save"

2. **Clone Wiki Repository**
   ```bash
   git clone https://github.com/username/repo-name.wiki.git
   cd repo-name.wiki
   ```

3. **Copy Documentation Files**
   ```bash
   # From your main repo
   cp docs/*.md ../repo-name.wiki/
   ```

4. **Commit and Push**
   ```bash
   cd ../repo-name.wiki
   git add .
   git commit -m "Add documentation"
   git push origin master
   ```

5. **Access Wiki**
   - Visit: `https://github.com/username/repo-name/wiki`

## Option 3: Keep in Repository (Current Setup)

Documentation is already in the `docs/` folder and can be viewed directly on GitHub.

### Advantages:
- ✅ Version controlled with code
- ✅ Can be reviewed in PRs
- ✅ No separate wiki repository
- ✅ Works offline
- ✅ Included in clones

### Access:
- Browse files in `docs/` folder on GitHub
- GitHub automatically renders markdown
- Links work within the repository

## Documentation Structure

```
docs/
├── Home.md              # Wiki home page
├── RULES.md             # Game rules
├── ARCHITECTURE.md      # Technical architecture
├── API.md               # API reference
├── DEVELOPMENT.md       # Development guide
└── QUICK_REFERENCE.md   # Quick lookup
```

## Linking Between Pages

### In Repository (Current)
```markdown
[Game Rules](RULES.md)
[Architecture](ARCHITECTURE.md)
```

### In GitHub Pages
```markdown
[Game Rules](RULES.html)
[Architecture](ARCHITECTURE.html)
```

### In GitHub Wiki
```markdown
[Game Rules](Game-Rules)
[Architecture](Architecture)
```

## Updating Documentation

### For Repository Docs (Current Setup)
1. Edit files in `docs/` folder
2. Commit changes
3. Push to GitHub
4. Documentation updates automatically

### For GitHub Wiki
1. Clone wiki repository
2. Edit markdown files
3. Commit and push
4. Or edit directly on GitHub wiki interface

## Recommended: Keep Current Setup

The current setup (docs in repository) is recommended because:

1. **Version Control**: Docs versioned with code
2. **Pull Requests**: Docs can be reviewed
3. **Offline Access**: Available in local clone
4. **Simplicity**: No separate wiki repo
5. **Portability**: Works on any Git host

## Adding to README

The README already links to all documentation:

```markdown
## 📚 Documentation

### Wiki Pages
- [Wiki Home](docs/Home.md)
- [Quick Reference](docs/QUICK_REFERENCE.md)

### Detailed Guides
- [Game Rules](docs/RULES.md)
- [Architecture](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [Development Guide](docs/DEVELOPMENT.md)
```

## For Contributors

When adding new documentation:

1. Create markdown file in `docs/` folder
2. Follow existing formatting style
3. Add link to `docs/Home.md`
4. Add link to `README.md` if appropriate
5. Submit PR with documentation changes

## Markdown Tips

### Headers
```markdown
# H1 - Page Title
## H2 - Major Section
### H3 - Subsection
```

### Links
```markdown
[Link Text](URL)
[Internal Link](RULES.md)
[External Link](https://example.com)
```

### Code Blocks
````markdown
```javascript
function example() {
    return "code";
}
```
````

### Tables
```markdown
| Column 1 | Column 2 |
|----------|----------|
| Data 1   | Data 2   |
```

### Lists
```markdown
- Bullet point
- Another point
  - Nested point

1. Numbered item
2. Another item
```

### Images
```markdown
![Alt Text](path/to/image.png)
```

## GitHub Features

### Automatic Features
- ✅ Syntax highlighting in code blocks
- ✅ Automatic table of contents (in some views)
- ✅ Emoji support (:smile: → 😊)
- ✅ Task lists (- [ ] Task)
- ✅ Automatic linking of issues (#123)

### Markdown Extensions
- ✅ Tables
- ✅ Strikethrough (~~text~~)
- ✅ Footnotes
- ✅ Definition lists
- ✅ Automatic URL linking

## Testing Documentation

### Local Preview
```bash
# Using Python
python3 -m http.server 8000
# Visit http://localhost:8000/docs/

# Using Node.js
npx http-server docs/
```

### Markdown Preview
- Use VS Code markdown preview
- Use GitHub's preview tab when editing
- Use online markdown editors

## Maintenance

### Regular Updates
- Keep docs in sync with code changes
- Update version numbers
- Fix broken links
- Add new features to documentation
- Update screenshots if UI changes

### Review Checklist
- [ ] All links work
- [ ] Code examples are correct
- [ ] Screenshots are current
- [ ] Formatting is consistent
- [ ] No typos or grammar errors
- [ ] Table of contents is updated

## Support

If you have questions about documentation:
1. Check existing docs first
2. Open an issue with "docs:" prefix
3. Suggest improvements via PR
4. Ask in discussions

---

**Current Status**: Documentation is complete and ready to use in the `docs/` folder! 📚
