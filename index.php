<?php
    require __DIR__ . "/model.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <header>
        <h2>Header</h2>
        <link rel="stylesheet" href="style.css">
    </header>
    <ul class="products-list">
        <?php foreach (getItems(1, 8) as $item): ?>
            <li>
                <img src="<?php echo $item['img']; ?>" alt="<?php echo $item['title']; ?>">
                <div><?php echo $item['title']; ?></div>
                <div><?php echo $item['description']; ?></div>
                <div><?php echo $item['discountCost'] ? $item['discountCost'] : $item['cost']; ?></div>
                <div class="sale"><?php if ($item['discountCost'] !== null): ?>
                        <?php echo $item['cost']; ?>
                        Sale
                    <?php endif; ?></div>
                <div class="new">
                    <?php if ($item['new']): ?>
                        New
                    <?php endif; ?>
                </div>
            </li>
        <?php endforeach; ?>
    </ul>
    <div class="spinner">loading...</div>
<!--    <button class="btn-load">Load more</button>-->
    <footer>
        <h2>Footer</h2>
    </footer>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="infiniteScrollv2.js"></script>
</body>
</html>