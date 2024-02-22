# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

comics = [
  {
    id: 1,
    title: '葬送のフリーレン',
    summary: '『葬送のフリーレン』（そうそうのフリーレン）は、山田鐘人（原作）、アベツカサ（作画）による日本の漫画。『週刊少年サンデー』（小学館）にて、2020年22・23合併号より連載中'
  },
  {
    id: 2,
    title: 'ワールドトリガー',
    summary: '『ワールドトリガー』（WORLD TRIGGER）は、葦原大介による日本の漫画作品。『週刊少年ジャンプ』（集英社）にて2013年11号から2018年52号まで連載された後、『ジャンプSQ.』にて2019年1月号から連載中'
  },
  {
    id: 3,
    title: '瀬戸の花嫁',
    summary: '『瀬戸の花嫁』（せとのはなよめ、My Bride Is a Mermaid）は、木村太彦による同名の漫画を原作としたテレビアニメ作品。'
  }
]

Comic.insert_all(comics)
