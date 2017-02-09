# == Schema Information
#
# Table name: visits
#
#  id           :integer          not null, primary key
#  user_id      :integer          not null
#  shortened_id :integer          not null
#  created_at   :datetime
#  updated_at   :datetime
#



class Visit < ActiveRecord::Base
    validates :user_id, :shortened_id, presence: true

    belongs_to :visitor,
      primary_key: :id,
      foreign_key: :user_id,
      class_name: :User

    belongs_to :visited_url,
      primary_key: :id,
      foreign_key: :shortened_id,
      class_name: :ShortenedUrl

    def self.recent(time)
      Visit.where("created_at > ?",time.minutes.ago)
    end

    def num_clicks
      self.visited_url.visits.count
    end

    def num_uniques
      self.visited_url.visitors.count
    end

    def self.num_recent_uniques
      Visit.recent(10).select(:user_id).distinct.count
    end

    def self.record_visit!(user, shortened_url)
      self.create!(user_id: user.id, shortened_id: shortened_url.id)
    end


end
