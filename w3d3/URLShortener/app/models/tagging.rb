# == Schema Information
#
# Table name: taggings
#
#  id           :integer          not null, primary key
#  shortened_id :integer          not null
#  tag_topic_id :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#



class Tagging < ActiveRecord::Base
  validates :shortened_id, :tag_topic_id, presence: true

  belongs_to :topic,
    primary_key: :id,
    foreign_key: :tag_topic_id,
    class_name: :TagTopic

  belongs_to :url,
    primary_key: :id,
    foreign_key: :shortened_id,
    class_name: :ShortenedUrl

end
