const slugify = require("slugify");
let data = [
  { name: "Fiction", category: "Books" },
  { name: "Non-fiction", category: "Books" },
  { name: "Mystery", category: "Books" },
  { name: "Romance", category: "Books" },
  { name: "Science Fiction", category: "Books" },
  { name: "Fantasy", category: "Books" },
  { name: "Biography", category: "Books" },
  { name: "Autobiography", category: "Books" },
  { name: "History", category: "Books" },
  { name: "Art", category: "Books" },
  { name: "Cooking", category: "Books" },
  { name: "Travel", category: "Books" },
  { name: "Health and Wellness", category: "Books" },
  { name: "Business", category: "Books" },
];

console.log(
  data.map((category) => {
    category.slug = slugify(category.name, {
      strict: true,
      lower: true,
      trim: true,
    });
    category.category = "642908ec8d978509813186fb";
    return category;
  })
);
