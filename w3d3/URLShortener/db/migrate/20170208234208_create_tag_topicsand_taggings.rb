class CreateTagTopicsandTaggings < ActiveRecord::Migration
  def change
    create_table :tag_topics do |t|
      t.string :tag_topic, null: false

      t.timestamps
    end

    add_index :tag_topics, :tag_topic, unique: true

    create_table :taggings do |t|
      t.integer :shortened_id, null: false
      t.integer :tag_topic_id, null: false

      t.timestamps
    end
  end
end
