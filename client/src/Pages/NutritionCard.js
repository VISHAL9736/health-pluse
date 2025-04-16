import { useEffect, useState } from "react";
import "../Styles/NutritionCard.css";
import { useNavigate } from "react-router-dom";

const NutritionCard = () => {
  const [food, setFood] = useState("");
  const navigate = useNavigate()
  const [nutritionData, setNutritionData] = useState([]);
  const [foodImages, setFoodImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const nutritionApiKey = "SXufljTLgaz/QKReOXXkZA==3Q17aKdN2KhXctwQ";
  const unsplashApiKey = "KWzGK8etFFlgpxnzYGg14CfjN_X66y-3llPU2xlI05U";

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login"); 
    }
  })

  // Fetch nutrition data
  const fetchNutrition = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
        headers: { "X-Api-Key": nutritionApiKey },
      });
      const data = await response.json();
      if (data.length > 0) setNutritionData(data);
      else console.error("No nutrition data found.");
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch food image from Unsplash
  const fetchFoodImage = async (foodName) => {
    try {
      const response = await fetch(`https://api.unsplash.com/photos/random?query=${foodName}&client_id=${unsplashApiKey}`);
      const data = await response.json();

      if (data?.urls?.small) {
        return data.urls.small;
      } else {
        console.warn("No image found for", foodName);
        return "assets/images/default-food.jpg";
      }
    } catch (error) {
      console.error("Error fetching food image:", error);
      return "assets/images/default-food.jpg"; // Fallback image
    }
  };

  // Fetch images for all nutrition data entries
  useEffect(() => {
    const loadImages = async () => {
      if (nutritionData.length > 0) {
        const images = await Promise.all(
          nutritionData.map((item) => fetchFoodImage(item.name))
        );
        setFoodImages(images);
      }
    };
    loadImages();
  }, [nutritionData]);

  // Search handler
  const handleSearch = () => {
    setNutritionData([]);
    setFoodImages([]);
    fetchNutrition(food);
  };

  return (
    <div className="container">
      <div className="search-bar sticky">
        <h1>Nutrition Finder</h1>
        <div className="search-input">
          <input
            type="text"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            placeholder="Search for food..."
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="card-grid">
          {nutritionData.length > 0 ? (
            nutritionData.map((item, index) => (
              <div key={index} className="card">
                <img src={foodImages[index] || "assets/images/default-food.jpg"} alt={item.name} className="card-img" />
                <div className="card-content">
                  <h2 className="card-title">{item.name}</h2>
                  <div className="card-details">
                    <p><strong>Calories:</strong> {item.calories}</p>
                    <p><strong>Serving Size:</strong> {item.serving_size_g} g</p>
                    <p><strong>Fat:</strong> {item.fat_total_g} g</p>
                    <p><strong>Protein:</strong> {item.protein_g} g</p>
                    <p><strong>Carbs:</strong> {item.carbohydrates_total_g} g</p>
                    <p><strong>Sugar:</strong> {item.sugar_g} g</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No data available. Try searching for another food item.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NutritionCard;
