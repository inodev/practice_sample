class Comic < ApplicationRecord
  validate :title, presence: true
end
