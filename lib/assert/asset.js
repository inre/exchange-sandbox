const ASSET_REGEXP = new RegExp('[A-Z]{2,6}')

function assertAsset (asset) {
  if (typeof asset !== 'string' || !ASSET_REGEXP.test(asset)) {
    throw new Error('Asset is invalid')
  }
  return asset
}

module.exports = assertAsset
