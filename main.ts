namespace SpriteKind {
    export const Minimap = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mapOpen) {
        minimapSprite.setFlag(SpriteFlag.Invisible, true)
        mapOpen = false
    } else {
        minimapSprite.setFlag(SpriteFlag.Invisible, false)
        mapOpen = true
    }
})
let mapOpen = false
let minimapSprite: Sprite = null
let taco = sprites.create(assets.image`taco`, SpriteKind.Player)
controller.moveSprite(taco)
tiles.setCurrentTilemap(tilemap`map`)
scene.cameraFollowSprite(taco)
let minimapObject = minimap.minimap()
let minimapImage = minimap.getImage(minimapObject)
minimapSprite = sprites.create(minimapImage, SpriteKind.Minimap)
minimapSprite.setFlag(SpriteFlag.RelativeToCamera, true)
minimapSprite.setFlag(SpriteFlag.Invisible, true)
minimapSprite.scale = 1
minimapSprite.left = 0
minimapSprite.top = 0
mapOpen = false
// have to constantly update the minimap to show where someone is real time
game.onUpdateInterval(100, function () {
    if (mapOpen) {
        minimapObject = minimap.minimap(MinimapScale.Eighth, 2, 0)
        minimap.includeSprite(minimapObject, taco, MinimapSpriteScale.MinimapScale)
        minimapSprite.setImage(minimap.getImage(minimapObject))
    }
})
