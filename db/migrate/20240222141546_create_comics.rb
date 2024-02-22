class CreateComics < ActiveRecord::Migration[7.1]
  def change
    create_table :comics do |t|
      t.string :title
      t.text :summary

      t.timestamps
    end
  end
end
