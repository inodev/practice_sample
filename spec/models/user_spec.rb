require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    describe 'email' do
      it 'is required' do
        user = build(:user, email: nil)
        user.valid?
        expect(user.errors[:email]).to be_present
      end

      it 'must be unique' do
        create(:user, email: 'sample@example.com')
        user = build(:user, email: 'sample@example.com')
        user.valid?
        expect(user.errors[:email]).to be_present
      end
    end
  end
end
