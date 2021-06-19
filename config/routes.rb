Rails.application.routes.draw do

  devise_for :users
  devise_scope :user do
    authenticated :user do
      root 'home#index', as: :authenticated_root
    end

    unauthenticated do
      root 'devise/sessions#new', as: :unauthenticated_root
    end
  end

  get 'home/index'

  #root :to => "home#index"
  #match "*path", to: "home#index", via: :get

  match "home", to: "home#index", via: :get

  match "profiles", to: "home#index", via: :get
  match "profiles/new", to: "home#index", via: :get
  match "profiles/:id", to: "home#index", via: :get
  match "profiles/:id/edit", to: "home#index", via: :get

  match "users", to: "home#index", via: :get
  match "users/new", to: "home#index", via: :get
  match "users/:id", to: "home#index", via: :get
  match "users/:id/edit", to: "home#index", via: :get

  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth',
        controllers: {
          sessions: 'api/v1/auth/sessions',
          registrations: 'api/v1/auth/registrations'
        }
      resources :profiles
      resources :users
    end
  end
end
