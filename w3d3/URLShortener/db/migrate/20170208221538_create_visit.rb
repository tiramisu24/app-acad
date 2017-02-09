class CreateVisit < ActiveRecord::Migration
  def change
    create_table :visits do |t|
      t.integer :user_id, null: false
      t.integer :shortened_id, null: false
      t.timestamps
    end
  end
end
