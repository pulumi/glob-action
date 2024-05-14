# Glob GitHub Action

GitHub action for performing file operations on selections of files.

## Usage

```yaml
- uses: pulumi/glob-action@v1
  with:
    # The operation to perform on the selected files.
    # Currently only supports "copy".
    operation: copy
    # List of glob patterns of the files to operate on. This can be a multi-line input with multiple patterns.
    # For full details of the patterns supported, see: https://github.com/mrmlnc/fast-glob#pattern-syntax
    files: |
      README.md
      src/**
      !node_modules
    # Directory within which to search for files. Defaults to the current directory
    source: .
    # Destination, required for the "copy" operation.
    destination: dest
```

### Outputs

| Name | Description | Example |
| - | - | - |
| `count` | Number of files matched. | `13` |
